<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\TransportOrderController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/dashboard/indicators', [TransportOrderController::class, 'getAmountOrders']);

Route::get('/driver/', [DriverController::class, 'getAll']);
Route::get('/driver/{id}', [DriverController::class, 'getById']);
Route::post('/driver/', [DriverController::class, 'create']);
Route::put('/driver/{id}', [DriverController::class, 'update']);
Route::patch('/driver/{id}/status', [DriverController::class, 'patchStatus']);

Route::get('/order/', [TransportOrderController::class, 'getAll']);
Route::get('/order/{id}', [TransportOrderController::class, 'getById']);
Route::post('/order/', [TransportOrderController::class, 'create']);
Route::put('/order/{id}', [TransportOrderController::class, 'update']);
Route::patch('/order/{id}/advance', [TransportOrderController::class, 'advanceOrder']);
Route::delete('/order/{id}', [TransportOrderController::class, 'deleteOrder']);
