from flask import Flask, request

app = Flask(__name__)

@app.route('/callback')
def callback():
    code = request.args.get('code')
    if code:
        return f"Authorization code received: {code}"
    else:
        return "Authorization code not received", 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)

