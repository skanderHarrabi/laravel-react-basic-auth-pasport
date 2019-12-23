<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register','Api\AuthController@register');
Route::post('/login','Api\AuthController@login');
Route::get('/login','Api\AuthController@login');
Route::middleware('auth:api')->post('/logout','Api\AuthController@logout');
Route::middleware('auth:api')->get('/posts','Api\PostController@index');
Route::middleware('auth:api')->post('/post/store','Api\PostController@store');
Route::middleware('auth:api')->delete('/post/delete/{id}','Api\PostController@destroy');
Route::middleware('auth:api')->get('/post/edit/{id}','Api\PostController@edit');
Route::middleware('auth:api')->put('/post/update/{id}','Api\PostController@update');
Route::middleware('auth:api')->get('/comments/{id}','Api\CommentController@index');
Route::middleware('auth:api')->post('/comments/{id}','Api\CommentController@store');
Route::middleware('auth:api')->delete('/comment/delete/{id}','Api\CommentController@destroy');

