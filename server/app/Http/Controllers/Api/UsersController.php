<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UsersController extends Controller
{

    public function index()
    {
        $users = User::paginate(10);
        return response()->json($users);
    }

    public function getUserById($id)
    {
        return response()->json(User::findorFail($id));
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $base64Image = $request->input('profile_picture');

        if (!$base64Image) {
            return response()->json(['error' => 'No image data provided'], 400);
        }

        $imageData = explode(',', $base64Image)[1];

        $image = base64_decode($imageData);

        if (!$image) {
            return response()->json(['error' => 'Image decoding failed'], 400);
        }

        $imageName = time() . '.webp';
        Storage::disk('public')->put('images/' . $imageName, $image);

        if (!Storage::disk('public')->exists('images/' . $imageName)) {
            return response()->json(['error' => 'Failed to save image'], 500);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => $request->password,
            'profile_picture' => $imageName,
        ]);

        if (!$user) {
            return response()->json(['error' => 'Failed to create user'], 500);
        }

        return response()->json($user);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user) {
            $token = $user->createToken('auth_token')->plainTextToken;
            return response()->json([
                'user' => $user,
                'token' => $token
            ]);
        }

        return response()->json(['error' => 'Invalid credentials'], 401);
    }
    public function logout(Request $request)
    {
        $res = $request->user()->tokens()->delete();
        return response()->json([
            'message' => 'Logged out',
            'tokens_deleted' => $res
        ]);
    }
}