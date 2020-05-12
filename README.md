# **Rails 5.2 using Reactjs with i18n support(en/fr/hi) and email setup**

This application uses Rails 5.2 along with Reactjs(16) for UI(single page) interface/validations and includes the i18n library to add support to two languages -  English(en) and Hindi(hi).Moreover,the application also exhibits basic setup to send emails, which requires SMTP USERNAME/PASSWORD, which can easily work with GMAIL/MANDRILL.This application uses postgresql(10) for database.


# How to setup and run the application

**Prerequesites:** The application uses ruby-2.6.3, which can be easily installed using rvm as shown [here](https://www.digitalocean.com/community/tutorials/how-to-install-ruby-on-rails-with-rvm-on-ubuntu-18-04) for ubuntu machine for windows [here](https://www.digitalocean.com/community/tutorials/how-to-install-ruby-and-set-up-a-local-programming-environment-on-windows-10)
Once rvm is installed, you need to setup Postgresql for the database by following the steps [here](https://www.digitalocean.com/community/tutorials/how-to-use-postgresql-with-your-ruby-on-rails-application-on-ubuntu-14-04) and setup the database.


**Clone the repo:**

    git clone https://github.com/mike1011/rails-demo.git
    cd rails-demo

   bundle install and db setup

    bundle install
    rails db:migrate

  As the project uses webpack(need yarn for this) for asset compilation, you need to run the command -

    ./bin/webpack-dev-server
  on separate console, so that it auto-reloads any css/js changes instantly without any need to restart the server.

**Add your Email settings, if any:**

     config/email.yml

   The application uses [letter-opener gem](https://github.com/ryanb/letter_opener) to show emails triggered on `dev` env, but that can be changed if you want to trigger emails to real email account. just replace `letter-opener` with `smtp` in `development.rb`


**Starting the application in development mode:**

   Run `rails s` in the root project folder of `rails-demo` to see browser running at  http://localhost:3000/


**Starting the application in development mode:**

   To add different language supports, add new file(for new language support) in `/config/locales` with language prefix, like `es.yml`, `rs.yml` and then pass in the locale parameter in the url to get the different languaage support up and running

    http://localhost:3000?locale=fr


**Testing**

  The application [rspec-rails](https://github.com/rspec/rspec-rails) to test backend code developed using Ruby on Rails and additionally uses [jest](https://jestjs.io/en/), [enzyme](https://github.com/enzymejs/enzyme) to test frontend code developed using Reactjs components. Is also generates coverage report, at the root directory of `coverage/index.html` for backend code coverage and `coverage/lcov-report/index.html` for front end code coverage

    To run the test, run the below commands in root directory

    ##to test backend code
    rspec
    ##to test frontend code
    npm test


**TECHNICAL DEBUGGING**


  If for some reasons, you are facing any error during setup like yarn, postgres, I have randomly added some quick fixes to get things up and running.

    ###Importing the repository’s GPG key using curl(sudo apit-get install curl)
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -

    -- add yarn repo
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

    -- update packages and install yarn
    sudo apt update
    sudo apt install yarn

    --verify by checking the version
    yarn --version

    --once you have the version, run yarn to precompile assets
    yarn

    -- run webpack in new console inside root folder of rails_demo
    ./bin/webpack-dev-server


 ***if you want to quickly send emails, either update the email.yml file with the required values that you have or paste the below code in environments/development.rb as shown below-***


    #/config/environments/development.rb

    ###paste this code at bottom- this one uses Gmail
    ##this is false in development, make it true
    config.action_mailer.raise_delivery_errors = true

    ##this is also set to different value, update this too
    config.action_mailer.default_url_options = { :host => 'localhost:3000', protocol: 'http' }

    ##update this line too
    config.action_mailer.delivery_method = :smtp

    ##this is not present in development.rb, just paste this
    config.action_mailer.smtp_settings = {
     address: "smtp.gmail.com",
     port: 587,
    authentication: "plain",
     enable_starttls_auto: true,
     user_name: "myemail@gmail.com",
     password: "mypassword"
    }



  ***if you face any problem with authentication/permission using database, you need to make sure you have proper rights.Kindly follow these steps as shown below..***

    #after installation of postgresql, create db easily like this...
    ###login in pg and we will create a new use and database and assign that user  the owner of the database that will be used in this app.

    sudo -u postgres psql
    ##once logged in as postgres, run below commands

    postgres=# create user demo  with password 'demo';

    ##check all existing roles
    postgres=# \du

    Role name |                   Attributes                   | Member of
    -----------+------------------------------------------------+-----------
    demo      |                                                | {}
    postgres  | Superuser, Create role, Create DB, Replication | {}
    ubuntu    | Superuser, Create role, Create DB              | {}

    postgres=# CREATE DATABASE demo_development WITH OWNER demo;
    postgres=# \l
                                    List of databases
          Name         |  Owner   | Encoding  | Collate | Ctype |   Access privileges
    ----------------------+----------+-----------+---------+-------+-----------------------
    demo_development     | demo     | SQL_ASCII | C       | C     |

    (6 rows)

    postgres=# GRANT ALL PRIVILEGES ON DATABASE demo_development TO demo;
    postgres=# \l
                                    List of databases
          Name         |  Owner   | Encoding  | Collate | Ctype |   Access privileges
    ----------------------+----------+-----------+---------+-------+-----------------------
    demo_development     | demo     | SQL_ASCII | C       | C     | =Tc/postgres         +


    postgres=# ALTER USER demo WITH SUPERUSER;


 **after running above commands, our db will be created and we can easily run rails db:migrate.**
