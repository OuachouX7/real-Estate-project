<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Error;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::create($request->all());
        return response()->json($user);
    }
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->where('password', $request->password)->first();
        if ($user) {
            $token = $user->createToken('auth_token')->plainTextToken;
            return response()->json([
                'user' => $user,
                'token' => $token
            ]);
        }
        throw new Error('User not found');
    }
}
