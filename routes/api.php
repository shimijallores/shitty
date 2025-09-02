<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LocalDiskController;

Route::get('/files', [LocalDiskController::class, 'index']);
Route::post('/files', [LocalDiskController::class, 'store']);
