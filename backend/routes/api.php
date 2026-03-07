<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DriverController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Drivers
Route::get('/driver/', [DriverController::class, 'getAll']);
Route::get('/driver/{id}', [DriverController::class, 'getById']);
Route::post('/driver/', [DriverController::class, 'create']);
Route::put('/driver/{id}', [DriverController::class, 'update']);
Route::patch('/driver/{id}/status', [DriverController::class, 'patchStatus']);
