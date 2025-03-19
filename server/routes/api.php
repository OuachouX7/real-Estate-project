<?php

use App\Http\Controllers\Api\UsersController;
use App\Http\Controllers\Api\PropertiesController;
use App\Http\Controllers\Api\FavoriteController;
use App\Http\Controllers\Api\MessageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [UsersController::class, 'logout']);
    Route::get('/users', [UsersController::class, 'index']);
    Route::post('/addProperty' , [PropertiesController::class , 'store']);
    Route::post('/addFavorite' , [FavoriteController::class , 'addFavorite']);
    Route::get('/favorites' , [FavoriteController::class , 'index']);
    Route::get('/getMessages' , [MessageController::class , 'index']);
    Route::post('/sendMessage' , [MessageController::class , 'sendMessage']);
    Route::get('/user/{id}',[UsersController::class,'getUserById']);
    Route::delete('/deleteFavorite/{id}',[FavoriteController::class,'deleteFavorite']);
    Route::delete('/deleteProperty/{id}',[PropertiesController::class,'deleteProperty']);
    Route::put('/properties/{id}',[PropertiesController::class,'updateProperty']);
});

Route::get('/properties', [PropertiesController::class, 'index']);
Route::get('/properties/{id}', [PropertiesController::class, 'show']);
Route::post('/login',[UsersController::class, 'login']);
Route::post('/register', [UsersController::class, 'register']);