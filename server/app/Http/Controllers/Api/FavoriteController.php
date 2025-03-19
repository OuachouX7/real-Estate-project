<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Favorite;
use App\Models\Property;
use App\Models\PropertyImage;

class FavoriteController extends Controller
{

    public function index(Request $request)
    {
        $request->validate([
            'user_id' => 'required'
        ]);
        $favorites = Favorite::where('user_id', $request->user_id)
            ->with(['property', 'property.images'])
            ->get();
        if (!$favorites) {
            return response()->json([
                'message' => 'No favorites found'
            ]);
        }
        return response()->json([
            'favorites' => $favorites,
        ]);
    }

    public function addFavorite(Request $request)
    {
        $request->validate([
            'user_id' => 'required',
            'property_id' => 'required'
        ]);

        $favoriteExist = Favorite::where('user_id', $request->user_id)->where('property_id', $request->property_id)->first();

        if (!$favoriteExist) {
            $favorite = Favorite::create([
                'user_id' => $request->user_id,
                'property_id' => $request->property_id
            ]);

            if (!$favorite) {
                return response()->json([
                    'success' => false,
                    'message' => 'Favorite not added'
                ]);
            }

            $favoriteProperty = Property::where('id', $request->property_id)->first();
            $favoriteImages = PropertyImage::where('property_id', $request->property_id)->get();

            return response()->json([
                'property' => $favoriteProperty,
                'favorite' => $favorite,
                'favoriteImages' => $favoriteImages
            ]);
        }


        return response()->json([
            'message' => 'Favorite already exist'
        ]);
    }
    public function deleteFavorite($id)
    {
        $favorite = Favorite::findorfail($id);
        dd($favorite);
        $favoriteImages = PropertyImage::where('property_id', $favorite->id)->get();
        if (!$favorite) {
            return response()->json([
                'message' => 'Favorite not found'
            ]);
        }
<<<<<<< HEAD
        return response()->json([
            'message' => 'Favorite deleted',
            'favorite' => $favorite,
            'favoriteImages' => $favoriteImages
=======
        //$favorite->delete();
        $favoriteImages = PropertyImage::where('property_id', $favorite->id)->get();
        foreach ($favoriteImages as $image) {
            $image->delete();
        }
        $favorite->delete();

        return response()->json([
            'message' => 'Favorite deleted',
            'favorite' => $favorite,
            'favoriteImages' => $favoriteImages,

>>>>>>> 254aabb109e25912b33ba52a1464ccd310cfeeed
        ]);
    }
}
