<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Property;
use App\Models\PropertyImage;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class PropertiesController extends Controller
{

    public function index()
    {
        $properties = Property::with('images')->paginate(4);

        return response()->json($properties);
    }

    public function show($id)
    {
        $property = Property::with('images')->find($id);

        if (!$property) {
            return response()->json(['error' => 'Property not found'], 404);
        }

        return response()->json($property);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'price' => 'required',
            'location' => 'required',
        ]);

        $property = Property::create([
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
            'location' => $request->location,
            'is_available' => true,
        ]);

        $propertyImages = [];

        foreach ($request->images as $image) {
            $imageData = explode(',', $image)[1];
            $imageDecoded = base64_decode($imageData);

            if (!$imageDecoded) {
                return response()->json(['error' => 'Image decoding failed'], 400);
            }

            $imageName = time() . '_' . uniqid() . '.webp';
            Storage::disk('public')->put('images/' . $imageName, $imageDecoded);

            $propertyImage = PropertyImage::create([
                'property_id' => $property->id,
                'image_url' => $imageName,
            ]);

            $propertyImages[] = $propertyImage;
        }

        return response()->json([
            'property' => $property,
            'images' => $propertyImages,
        ]);
    }
    public function deleteProperty($id)
    {
        $property = Property::findorfail($id);
        $favoriteImages = PropertyImage::where('property_id', $property->id)->get();
        foreach ($favoriteImages as $image) {
            $image->delete();
        }
        $property->delete();
        return response()->json([
            'message' => 'Property deleted',
            'property' => $property,
            'favoriteImages' => $favoriteImages,
        ]);

    }
    public function updateProperty(Request $request, $id){
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'price' => 'required',
            'location' => 'required',
            'is_available' => 'required',
        ]);
        $property = Property::findorfail($id);
        $property->update([
          'title' => $request->title,
          'description' => $request->description,
          'price' => $request->price,
          'location' => $request->location,
          'is_available' => $request->is_available
        ]);
        return response()->json([
            'property' => $property,
        ]);
    }
}
