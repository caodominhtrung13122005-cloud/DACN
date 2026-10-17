<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    /**
     * Register a new FARMER or BUYER user.
     * Sanctum SPA cookie session auth is used.
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $role = $validated['role'];
        $accountType = $role === 'FARMER' ? $validated['account_type'] : null;

        $user = User::create([
            'phone' => $validated['phone'],
            'email' => $validated['email'] ?? null,
            'password' => Hash::make($validated['password']),
            'role' => $role,
            'account_type' => $accountType,
            'full_name' => $validated['full_name'],
            'status' => 'ACTIVE',
        ]);

        Auth::login($user);

        if ($request->hasSession()) {
            $request->session()->regenerate();
        }

        return response()->json([
            'message' => 'Đăng ký tài khoản thành công.',
            'user' => $user,
        ], 201);
    }

    /**
     * Authenticate user with phone and password.
     * Regenerates session on success, enforces rate limiting, and rejects suspended accounts.
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $loginInput = trim($request->input('phone'));
        $throttleKey = Str::transliterate(Str::lower($loginInput) . '|' . $request->ip());

        if (RateLimiter::tooManyAttempts($throttleKey, 5)) {
            $seconds = RateLimiter::availableIn($throttleKey);

            return response()->json([
                'message' => 'Bạn đã thử đăng nhập quá nhiều lần. Vui lòng thử lại sau ' . $seconds . ' giây.',
                'retry_after' => $seconds,
            ], 429);
        }

        $loginField = filter_var($loginInput, FILTER_VALIDATE_EMAIL) ? 'email' : 'phone';

        if (! Auth::attempt([$loginField => $loginInput, 'password' => $request->input('password')], $request->boolean('remember'))) {
            RateLimiter::hit($throttleKey, 60);

            return response()->json([
                'message' => 'Thông tin đăng nhập không chính xác.',
                'errors' => [
                    'credentials' => ['Thông tin đăng nhập không chính xác.'],
                ],
            ], 422);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();

        if ($user->status === 'SUSPENDED') {
            Auth::guard('web')->logout();

            if ($request->hasSession()) {
                $request->session()->invalidate();
                $request->session()->regenerateToken();
            }

            return response()->json([
                'message' => 'Tài khoản của bạn đã bị tạm khóa. Vui lòng liên hệ quản trị viên.',
            ], 403);
        }

        RateLimiter::clear($throttleKey);

        if ($request->hasSession()) {
            $request->session()->regenerate();
        }

        return response()->json([
            'message' => 'Đăng nhập thành công.',
            'user' => $user,
        ], 200);
    }

    /**
     * Log out current user, invalidate session, and regenerate CSRF token.
     */
    public function logout(Request $request): JsonResponse
    {
        Auth::guard('web')->logout();

        if ($request->hasSession()) {
            $request->session()->invalidate();
            $request->session()->regenerateToken();
        }

        Auth::forgetGuards();

        return response()->json([
            'message' => 'Đăng xuất thành công.',
        ], 200);
    }

    /**
     * Get the authenticated user.
     */
    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'user' => $request->user(),
        ], 200);
    }
}
