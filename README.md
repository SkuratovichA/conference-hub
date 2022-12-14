### Setting up a database:
 1. install mysql (via brew/apt)
 2. `mysql -u root -p`
 3. `alter user 'root'@'localhost' identified with mysql_native_password by ''`
 4. `create database conference_hub`

### Setting up Django server
 1. `python3 -m venv /path/to/new/virtual/environment`
 2. `source /path/to/new/virtual/environment/bin/activate`
 3. `./manage.py makemigrations && ./manage.py migrate`   
 
### Setting up react
 1. `cd frontend`
 2. `npm ci`
 3. `npm start`


#### Project files
  - `{ch,users,conferences}` - backenda
  - `frontend/*` - frontend
  - `frontend/src/` - source codes
