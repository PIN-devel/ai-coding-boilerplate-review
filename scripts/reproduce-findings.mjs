// Observation probes, not a product test suite. Exit 0 means the recorded defects
// were reproduced. Uses synthetic responses; never reads .env or contacts an API.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'

const root = new URL('../', import.meta.url)
const projectRequire = createRequire(new URL('antigravity-test/package.json', root))
let ts
try {
  ts = projectRequire('typescript')
} catch {
  console.error('Install antigravity-test dependencies with pnpm before running this probe.')
  process.exit(1)
}

function loadSource(relativePath, fetchMock) {
  const filename = fileURLToPath(new URL(relativePath, root))
  const source = readFileSync(filename, 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  })
  const exports = {}
  vm.runInNewContext(outputText, {
    exports,
    require(specifier) {
      assert.equal(specifier, '../config')
      return { ENV: { API_BASE_URL: 'https://example.invalid' } }
    },
    URL, AbortController, Error, TypeError, setTimeout, clearTimeout,
    window: { location: { origin: 'https://example.invalid' } },
    fetch: fetchMock,
  }, { filename })
  return exports
}

const probes = [
  ['Antigravity: caller cancellation signal is replaced', async () => {
    let received
    const { http } = loadSource('antigravity-test/src/shared/api/client.ts', async (_url, init) => {
      received = init.signal
      return new Response('{}')
    })
    const controller = new AbortController()
    controller.abort()
    await http.get('/posts', { signal: controller.signal })
    assert.notEqual(received, controller.signal)
    assert.equal(received.aborted, false)
  }],
  ['Antigravity: top-level false request body is omitted', async () => {
    let received
    const { http } = loadSource('antigravity-test/src/shared/api/client.ts', async (_url, init) => {
      received = init.body
      return new Response('{}')
    })
    await http.post('/posts', false)
    assert.equal(received, undefined)
  }],
  ['Antigravity: text HTTP 503 loses its ApiError status', async () => {
    const api = loadSource('antigravity-test/src/shared/api/client.ts', async () =>
      new Response('Service unavailable', { status: 503, statusText: 'Service Unavailable' }))
    await assert.rejects(api.http.get('/posts'), error => {
      assert.equal(error.name, 'TypeError')
      assert.equal(error instanceof api.ApiError, false)
      assert.equal(error.status, undefined)
      return true
    })
  }],
  ['Cursor: HTTP 204 is rejected during JSON parsing', async () => {
    const { http } = loadSource('cursor-test/src/shared/api/http.ts', async () =>
      new Response(null, { status: 204 }))
    await assert.rejects(http('/posts'), error => error.name === 'SyntaxError')
  }],
]

let reproduced = 0
for (const [name, probe] of probes) {
  try {
    await probe()
    reproduced += 1
    console.log(`REPRODUCED: ${name}`)
  } catch (error) {
    console.error(`NOT REPRODUCED / PROBE ERROR: ${name}`)
    console.error(error)
  }
}
console.log(`${reproduced}/${probes.length} recorded findings reproduced. This is not a health check.`)
if (reproduced !== probes.length) process.exitCode = 1
