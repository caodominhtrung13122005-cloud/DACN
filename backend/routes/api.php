<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes — MEKAGREEN Phase S1A
|--------------------------------------------------------------------------
|
| Laravel Sanctum SPA Cookie Session Authentication
|
*/

// Public Authentication Endpoints
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');

// Protected Authenticated Endpoints
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::get('/user', fn (Request $request) => $request->user());

    // Role-Protected Endpoints (Server-Enforced Authorization)
    Route::middleware('role:FARMER')->get('/test/farmer-only', function (Request $request) {
        return response()->json([
            'message' => 'Truy cập thành công khu vực Nông dân.',
            'user_id' => $request->user()->id,
            'role' => $request->user()->role,
        ]);
    });

    Route::middleware('role:BUYER')->get('/test/buyer-only', function (Request $request) {
        return response()->json([
            'message' => 'Truy cập thành công khu vực Thương nhân.',
            'user_id' => $request->user()->id,
            'role' => $request->user()->role,
        ]);
    });

    Route::middleware('role:ADMIN')->get('/test/admin-only', function (Request $request) {
        return response()->json([
            'message' => 'Truy cập thành công khu vực Quản trị viên.',
            'user_id' => $request->user()->id,
            'role' => $request->user()->role,
        ]);
    });
});
