<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use App\Models\Driver;
/* use Illuminate\Http\RedirectResponse; */

class DriverController extends Controller
{
    public function getById(int $id)
    {
        $driver = DB::table('drivers')->where('id', $id)->firstOrFail();

        return $driver;
    }

    public function getAll()
    {
        $drivers = DB::table('drivers')->get();

        return $drivers;
    }

    public function create(Request $request): JsonResponse
    {
        $rawBody = $request->getContent();
        $data = json_decode($rawBody, true);
        $driver = Driver::create($data);

        return response()->json($driver);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $rawBody = $request->getContent();
        $data = json_decode($rawBody, true);

        $driver = Driver::find($id);
        $driver->update($data);
        $changes = $driver->getChanges();

        return response()->json($changes);
    }

    public function patchStatus(int $id): JsonResponse
    {
        $driver = Driver::findOrFail($id);
        $driver->update([
            'is_active' => !$driver->is_active,
        ]);
        $changes = $driver->getChanges();

        return response()->json($changes);
    }
}
