<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PropertyController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'location' => 'required|string',
            'bedrooms' => 'required|integer',
            'bathrooms' => 'required|integer',
            'square_feet' => 'nullable|integer',
            'property_type' => 'required|string',
            'is_available' => 'boolean',
            'image' => 'nullable|string', // Expecting base64 image
        ]);

        $imageName = null;
        if ($request->has('image')) {
            $imageName = $this->handleImageUpload($request->input('image'));
        }

        $property = Property::create([
            'user_id' => $request->user()->id,
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
            'location' => $request->location,
            'bedrooms' => $request->bedrooms,
            'bathrooms' => $request->bathrooms,
            'square_feet' => $request->square_feet,
            'property_type' => $request->property_type,
            'is_available' => $request->is_available ?? true,
            'image' => $imageName,
        ]);

        return response()->json($property, 201);
    }

    public function index()
    {
        return response()->json(Property::all());
    }

    public function show($id)
    {
        $property = Property::find($id);
        if (!$property) {
            return response()->json(['error' => 'Property not found'], 404);
        }
        return response()->json($property);
    }

    public function update(Request $request, $id)

        $property = Property::find($id);
        if (!$property) {
            return response()->json(['error' => 'Property not found'], 404);
        }

        $request->validate([
            'title' => 'sometimes|string',
            'description' => 'sometimes|string',
            'price' => 'sometimes|numeric',
            'location' => 'sometimes|string',
            'bedrooms' => 'sometimes|integer',
            'bathrooms' => 'sometimes|integer',
            'square_feet' => 'nullable|integer',
            'property_type' => 'sometimes|string',
            'is_available' => 'boolean',
            'image' => 'nullable|string',
        ]);

        // Handle Image Upload
        if ($request->has('image')) {
            // Delete old image before saving new one
            if ($property->image) {
                Storage::disk('public')->delete('property_images/' . $property->image);
            }
            $property->image = $this->handleImageUpload($request->input('image'));
        }

        $property->update($request->except('image')); // Avoid overriding with null image

        return response()->json($property);
    }

    public function destroy($id)
    {
        $property = Property::find($id);
        if (!$property) {
            return response()->json(['error' => 'Property not found'], 404);
        }

        // Delete the stored image
        if ($property->image) {
            Storage::disk('public')->delete('property_images/' . $property->image);
        }

        $property->delete();
        return response()->json(['message' => 'Property deleted successfully']);
    }

    private function handleImageUpload($base64Image)
    {
        // Check if base64 is valid
        if (!preg_match('/^data:image\/(\w+);base64,/', $base64Image, $matches)) {
            return null; // Invalid base64 format
        }

        $imageExtension = $matches[1]; // Extract extension
        $imageData = substr($base64Image, strpos($base64Image, ',') + 1); // Get actual base64 content

        // Decode image
        $image = base64_decode($imageData);
        if (!$image) {
            return null; // Failed decoding
        }

        // Generate a unique filename
        $imageName = time() . '.' . $imageExtension;
        Storage::disk('public')->put('property_images/' . $imageName, $image);

        return $imageName;
    }
}
