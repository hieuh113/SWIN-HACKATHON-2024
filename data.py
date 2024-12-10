import requests
import time
import json
from datetime import datetime

# Thay thế ACCESS_TOKEN bằng Access Token thực của bạn
ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1BURjciLCJzdWIiOiJDOFlZWDYiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd251dCB3cHJvIHdzbGUgd3dlaSB3c29jIHdzZXQgd2FjdCB3bG9jIiwiZXhwIjoxNzI3NDMwODM3LCJpYXQiOjE3Mjc0MDIwMzd9.A31sULBIcAjwelmKNM6VOdygGR16YKqndSZYqwOdkKE'
headers = {
    'Authorization': f'Bearer {ACCESS_TOKEN}'
}

# Khởi tạo file dữ liệu nếu chưa có
output_file = 'fitbit_data.json'

# Hàm khởi tạo tệp nếu tệp chưa tồn tại
def init_file():
    try:
        with open(output_file, 'r') as file:
            data = json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        with open(output_file, 'w') as file:
            json.dump({"data": []}, file)

# Hàm để lấy dữ liệu từ mỗi API endpoint cho 7 ngày gần nhất
def get_steps():
    url = 'https://api.fitbit.com/1/user/-/activities/steps/date/today/7d.json'
    response = requests.get(url, headers=headers)
    return handle_response(response, 'steps', 'activities-steps')

def get_distance():
    url = 'https://api.fitbit.com/1/user/-/activities/distance/date/today/7d.json'
    response = requests.get(url, headers=headers)
    return handle_response(response, 'distance', 'activities-distance')

def get_calories():
    url = 'https://api.fitbit.com/1/user/-/activities/calories/date/today/7d.json'
    response = requests.get(url, headers=headers)
    return handle_response(response, 'calories', 'activities-calories')

def get_weight():
    url = 'https://api.fitbit.com/1/user/-/body/weight/date/today/7d.json'
    response = requests.get(url, headers=headers)
    return handle_response(response, 'weight', 'body-weight')

def get_heart_rate():
    url = 'https://api.fitbit.com/1/user/-/activities/heart/date/today/7d.json'
    response = requests.get(url, headers=headers)
    return handle_response(response, 'heart_rate', 'activities-heart')

# Xử lý phản hồi từ Fitbit API và trả về dữ liệu cần thiết
def handle_response(response, data_type, key):
    if response.status_code == 200:
        data = response.json()
        if data.get(key):
            return data[key]  # Trả về danh sách dữ liệu cho 7 ngày gần nhất
    elif response.status_code == 429:
        print(f"Error: Too Many Requests for {data_type} data.")
        headers = response.headers
        retry_after = int(headers.get('fitbit-rate-limit-reset', 60))
        print(f"Waiting for {retry_after} seconds before retrying.")
        time.sleep(retry_after)
        return None
    else:
        print(f"Failed to fetch {data_type} data: {response.status_code}")
        return None

# Ghi dữ liệu mới vào file JSON
def update_file(data_list):
    with open(output_file, 'r+') as file:
        data = json.load(file)
        for entry in data_list:
            # Thêm từng bản ghi mới vào file
            data['data'].append(entry)
        file.seek(0)
        json.dump(data, file, indent=2)
    print(f"Data updated. Total records: {len(data['data'])}")

# Chuẩn bị dữ liệu cuối cùng cho từng chỉ số
def prepare_data(steps_data, distance_data, calories_data, weight_data, heart_rate_data):
    data_list = []
    timestamps = [entry['dateTime'] for entry in steps_data]  # Lấy timestamp từ bước chân
    
    # Xây dựng từng bản ghi dựa trên timestamps
    for i in range(len(timestamps)):
        timestamp = timestamps[i]
        steps = int(steps_data[i]['value']) if steps_data else 0
        distance = float(distance_data[i]['value']) if distance_data else 0.0
        calories = int(calories_data[i]['value']) if calories_data else 0
        weight = float(weight_data[i]['value']) if weight_data else 0.0
        heart_rate = heart_rate_data[i]['value']['restingHeartRate'] if heart_rate_data and 'restingHeartRate' in heart_rate_data[i]['value'] else 0

        # Thêm dữ liệu vào danh sách
        data_list.append({
            "timestamp": timestamp,
            "weight": weight,
            "calories": calories,
            "steps": steps,
            "distance": distance,
            "heart_rate": heart_rate
        })
    
    # Ghi dữ liệu vào file
    update_file(data_list)

# Thực hiện các yêu cầu và chuẩn bị dữ liệu
def fetch_and_update():
    print("Fetching new data...")

    # Lấy dữ liệu từ các API
    steps_data = get_steps()
    distance_data = get_distance()
    calories_data = get_calories()
    weight_data = get_weight()
    heart_rate_data = get_heart_rate()

    if steps_data and distance_data and calories_data and weight_data and heart_rate_data:
        # Chuẩn bị dữ liệu để ghi vào file
        prepare_data(steps_data, distance_data, calories_data, weight_data, heart_rate_data)
    else:
        print("Error fetching one or more data points.")

# Vòng lặp để liên tục cập nhật dữ liệu sau mỗi khoảng thời gian
def continuous_update(interval=300):  # Mặc định: cập nhật sau mỗi 5 phút (300 giây)
    init_file()
    while True:
        fetch_and_update()
        time.sleep(interval)

# Chạy chương trình chính
if __name__ == '__main__':
    continuous_update(300)  # Cập nhật mỗi 5 phút
