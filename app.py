import json
from flask import Flask, request, jsonify
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import (
    create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager
)
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from models import db, User

# Additional import for password reset
from itsdangerous import URLSafeTimedSerializer

api = Flask(__name__)
CORS(api, supports_credentials=True)

api.config['SECRET_KEY'] = 'i-am-unlimited'
api.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///projectdb.db'
api.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(api)
serializer = URLSafeTimedSerializer('i-am-unlimited')  # Replace 'your_secret_key' with an actual secret key
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_ECHO = True

bcrypt = Bcrypt(api)
db.init_app(api)

with api.app_context():
    db.create_all()

@api.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@api.route('/logintoken', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Wrong email or passwords"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401

    access_token = create_access_token(identity=email)

    return jsonify({
        "email": email,
        "access_token": access_token
    })

@api.route("/signup", methods=["POST"])
def signup():
    try:
        name = request.json["name"]
        email = request.json["email"]
        username = request.json["username"]
        password = request.json["password"]

        user_exists = User.query.filter_by(email=email).first() is not None

        if user_exists:
            return jsonify({"error": "Email already exists"}), 409

        hashed_password = bcrypt.generate_password_hash(password)
        new_user = User(name=name, email=email, username=username, password=hashed_password, about="")
        db.session.add(new_user)
        db.session.commit()

        access_token = create_access_token(identity=email)
        return jsonify({
            "access_token": access_token
        })

    except Exception as e:
        print(str(e))
        return jsonify({"error": "Invalid request"}), 400

@api.route("/update-profile", methods=["PUT"])
@jwt_required()
def update_profile():
    try:
        current_user_email = get_jwt_identity()
        user = User.query.filter_by(email=current_user_email).first()

        if not user:
            return jsonify({"error": "User not found"}), 404

        data = request.get_json()

        if "email" in data:
            user.email = data["email"]

        if "about" in data:
            user.about = data["about"]

        db.session.commit()

        access_token = create_access_token(identity=current_user_email)
        return jsonify({"access_token": access_token})

    except Exception as e:
        print(str(e))
        return jsonify({"error": "Invalid request"}), 400

@api.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        return response

@api.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@api.route('/profile/<getemail>')
@jwt_required()
def my_profile(getemail):
    print(getemail)
    if not getemail:
        return jsonify({"error": "Unauthorized Access"}), 401

    user = User.query.filter_by(email=getemail).first()

    response_body = {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "about": user.about
    }

    return response_body
