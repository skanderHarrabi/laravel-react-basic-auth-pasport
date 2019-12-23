## Clone the project to a location you choose then cd to the project and run these commands:

1. Copy the .env.example and change his name to .env,
Then edit your .env file with DB credentials and other settings.

2. Run composer install command

3. Run php artisan migrate and if you have a default data to insert to DB add --seed option.
 
4. Run php artisan passport:install to generate Clients

5. Run php artisan key:generate command.

6. Run php artisan storage:link command

7. Run npm install

8. finally Run npm run dev or npm run watch next Run php artisan serve to start the serve

* Open in browser localhost:8000
