# Retell AI Call — n8n HTTP Request Node Config

## Node Settings

| Setting | Value |
|---------|-------|
| Method | `POST` |
| URL | `https://api.retellai.com/v2/create-phone-call` |
| Authentication | Header Auth |
| Header Name | `Authorization` |
| Header Value | `Bearer key_dae09b2c591db3ffb074df8cafc4` |
| Send Body | Yes |
| Specify Body | JSON |

## JSON Body

```
={
  "agent_id": "agent_2b30b06cb31fc9c529a16ac641",
  "to_number": "{{ $json.phone }}",
  "from_number": "+19063982723",
  "metadata": {
    "lead_name": "{{ $json.name }}",
    "company": "{{ $json.company }}",
    "monthly_leads": "{{ $json.monthlyLeads }}",
    "challenge": "{{ $json.biggestChallenge }}"
  },
  "retell_llm_dynamic_variables": {
    "current_time": "{{ $now.setZone('Asia/Kuala_Lumpur').toFormat('yyyy-MM-dd HH:mm:ss') }}",
    "lead_name": "{{ $json.name }}",
    "company_name": "{{ $json.company }}",
    "monthly_leads": "{{ $json.monthlyLeads }}",
    "challenge": "{{ $json.biggestChallenge }}"
  }
}
```

## Dynamic Variable Mapping

| Retell Variable | n8n Expression | Source |
|-----------------|----------------|--------|
| `{{current_time}}` | `$now.setZone('Asia/Kuala_Lumpur').toFormat('yyyy-MM-dd HH:mm:ss')` | n8n system time, converted to MYT (GMT+8) |
| `{{lead_name}}` | `$json.name` | Form field: Full Name |
| `{{company_name}}` | `$json.company` | Form field: Company Name |
| `{{monthly_leads}}` | `$json.monthlyLeads` | Form field: Monthly lead volume |
| `{{challenge}}` | `$json.biggestChallenge` | Form field: Biggest challenge |
