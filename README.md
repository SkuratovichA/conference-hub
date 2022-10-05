## setup (temporaty, probably)
### database:
if there is a problem with permissions:
 - install mysql
 - `mysql -u root -p
 - `alter user 'root'@`localhost` identified by mysql\_native\_password by ''`
if there is a problem with non-existing database:
 - `create database <conference-hub>`

### Project files
 - layout - basic layout: some common static files and a basic-template (other templates extend this one, main purpose is to include a common html <head> ). Also contains the home-page and some other simple pages.
 - conference-hub - contains the project settings / configuration
 - ch - the actual app we create.
