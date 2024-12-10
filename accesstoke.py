import requests
from requests.auth import HTTPBasicAuth

# Thông tin từ Fitbit Developer
client_id = '23PTF7'
client_secret = '5506d134481255b25f85adcf0f5d6919'
authorization_code = '00be978421adef3414798f52212604cd0aac36fb'
redirect_uri = 'http://localhost:8000/callback'

# Định nghĩa URL và dữ liệu cho yêu cầu POST
token_url = "https://api.fitbit.com/oauth2/token"
token_data = {
    'client_id': client_id,
    'grant_type': 'authorization_code',
    'redirect_uri': redirect_uri,
    'code': authorization_code,
    'client_secret': client_secret
}

# Gửi yêu cầu POST để lấy access token
response = requests.post(token_url, auth=HTTPBasicAuth(client_id, client_secret), data=token_data)

# Kiểm tra kết quả
if response.status_code == 200:
    token_response = response.json()
    access_token = token_response.get('access_token')
    refresh_token = token_response.get('refresh_token')
    print(f"Access Token: {access_token}")
    print(f"Refresh Token: {refresh_token}")
else:
    print(f"Failed to get access token: {response.status_code}")
    print(response.text)
