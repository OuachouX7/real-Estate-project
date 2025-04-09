<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Twilio\Rest\Client;
use Illuminate\Support\Str;

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

        $imageResource = imagecreatefromstring($image);

        if (!$imageResource) {
            return response()->json(['error' => 'Failed to create image from string'], 400);
        }

        $imageName = time() . '.webp';
        $path = storage_path('app/public/images/' . $imageName);

        $compressionQuality = 80;
        if (!imagewebp($imageResource, $path, $compressionQuality)) {
            return response()->json(['error' => 'Failed to save the image'], 500);
        }

        imagedestroy($imageResource);

        if (!file_exists($path)) {
            return response()->json(['error' => 'Image was not saved properly'], 500);
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
    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $token = Str::random(60);

        $formattedPhoneNumber = 'whatsapp:' . $user->phone;

        $password = $user->password;

        $this->sendWhatsAppMessage($formattedPhoneNumber, $token, $password);

        return response()->json(['message' => 'Password reset link sent via WhatsApp.']);
    }

    /**
     * 
     *
     * @param string
     * @param string
     * @return string 
     */


    /**
     *
     *
     * @param string 
     * @param string 
     */
    protected function sendWhatsAppMessage($phoneNumber, $token, $password)
    {
        $sid = env('TWILIO_SID');
        $authToken = env('TWILIO_AUTH_TOKEN');
        $twilioNumber = env('TWILIO_WHATSAPP_NUMBER');

        $client = new Client($sid, $authToken);


        $resetLink = url("http://localhost:5173/password/reset?token={$token}&&password={$password}");

        try {
            $client->messages->create(
                $phoneNumber,
                [
                    'from' => 'whatsapp:' . $twilioNumber,
                    'body' => "Hello,You can reset your password using this link: {$resetLink}"
                ]
            );
        } catch (\Twilio\Exceptions\RestException $e) {
            return response()->json(['error' => 'Failed to send WhatsApp message: ' . $e->getMessage()], 500);
        }
    }
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'confirmPassword' => 'required',
            'token' => 'required'
        ]);
        $user = User::where('email', $request->email)
            ->first();
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $user->update([
            'password' => $request->password
        ]);
        return response()->json([
            'message' => 'Password reset successfully.',
            'user' => $user
        ]);
    }
}
