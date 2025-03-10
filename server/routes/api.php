<?php

use App\Http\Controllers\Api\UsersController;
use App\Http\Controllers\Api\PropertiesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [UsersController::class, 'logout']);
    Route::get('/users', [UsersController::class, 'index']);
    Route::post('/addProperty' , [PropertiesController::class , 'store']);
    Route::get('/properties', [PropertiesController::class, 'index']);
    Route::get('/properties/{id}', [PropertiesController::class, 'show']);
});

Route::post('/login',[UsersController::class, 'login']);
Route::post('/register', [UsersController::class, 'register']);