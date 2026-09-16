import test from 'node:test';
import assert from 'node:assert/strict';
import { createLeadHandler } from '../lib/lead-handler.mjs';
const fields = { name: 'Test Owner', businessName: 'Example Firm', email: 'owner@example.com', website: 'example.com', enquirySituation: 'We follow up manually.', contactConsent: true };
const request = (body = fields) => new Request('http://localhost/api/lead', { method: 'POST', body: JSON.stringify(body) });
test('valid application is normalized and cannot spoof provenance', async () => {
  const calls = [];
  const handler = createLeadHandler({ webhookUrl: 'https://mock.invalid', fetchImpl: async (url, options) => { calls.push(JSON.parse(options.body)); return { ok: true }; } });
  assert.equal((await handler(request({ ...fields, source: 'spoof', timestamp: 'yesterday', extra: 'discard' }))).status, 200);
  assert.equal(calls[0].source, 'zentra-landing-page');
  assert.equal(calls[0].website, 'https://example.com/');
  assert.ok(!Number.isNaN(Date.parse(calls[0].timestamp)));
  assert.equal(calls[0].extra, undefined);
});
test('invalid inputs and missing consent never reach downstream', async () => {
  const handler = createLeadHandler({ webhookUrl: 'https://mock.invalid', fetchImpl: () => { throw new Error('must not call'); } });
  for (const body of [null, [], { ...fields, email: 'bad' }, { ...fields, contactConsent: false }, { ...fields, name: {} }, { ...fields, enquirySituation: 'x'.repeat(2001) }, { ...fields, website: 'javascript:alert(1)' }]) assert.equal((await handler(request(body))).status, 400);
  assert.equal((await handler(new Request('http://localhost', { method: 'POST', body: '{' }))).status, 400);
});
test('unconfigured local preview does not forward', async () => {
  assert.equal((await createLeadHandler({})(request())).status, 503);
});
test('required service failure returns 502 and skips dashboard', async () => {
  let count = 0;
  const handler = createLeadHandler({ webhookUrl: 'https://mock.invalid', dashboardUrl: 'https://dashboard.invalid', fetchImpl: async () => { count++; return { ok: false }; } });
  assert.equal((await handler(request())).status, 502);
  assert.equal(count, 1);
});
test('timeout aborts downstream request and returns failure', async () => {
  let signal;
  const handler = createLeadHandler({ webhookUrl: 'https://mock.invalid', timeoutMs: 10, fetchImpl: async (_, options) => { signal = options.signal; return new Promise(() => {}); } });
  assert.equal((await handler(request())).status, 502);
  assert.equal(signal.aborted, true);
});
test('optional dashboard receives normalized record; failure does not lose primary receipt', async () => {
  const calls = [];
  const handler = createLeadHandler({ webhookUrl: 'https://mock.invalid', dashboardUrl: 'https://dashboard.invalid', dashboardKey: 'test-key', fetchImpl: async (url, options) => { calls.push({ url, options }); return { ok: calls.length === 1 }; } });
  assert.equal((await handler(request())).status, 200);
  assert.equal(calls[1].options.headers['x-leads-key'], 'test-key');
  assert.equal(JSON.parse(calls[1].options.body).company, fields.businessName);
});
