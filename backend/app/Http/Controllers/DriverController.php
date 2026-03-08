<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use App\Models\Driver;

class DriverController extends Controller
{
    public function getAll(Request $request)
    {
        $query = Driver::query();

        $query->when($request->query('is_active'), function ($query, $isActive) {
            return $query->where('is_active', filter_var($isActive, FILTER_VALIDATE_BOOLEAN));
        });

        return response()->json($query->orderBy('is_active', 'desc')->get());
    }

    public function getById(int $id)
    {
        $driver = Driver::find($id);

        return $driver;
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
        $driver = Driver::find($id);
        if (!$driver) {
            return response()->json([
                "mensagem" => "Motorista com id '$id' não pôde ser encontrado."
            ], 400);
        }
        $rawBody = $request->getContent();
        $data = json_decode($rawBody, true);

        $driver->update($data);
        $changes = $driver->getChanges();

        return response()->json($changes);
    }

    public function patchStatus(int $id): JsonResponse
    {
        $driver = Driver::find($id);
        if (!$driver) {
            return response()->json([
                "mensagem" => "Motorista com id '$id' não pôde ser encontrado."
            ], 400);
        }
        $driver->update([
            'is_active' => !$driver->is_active,
        ]);
        $changes = $driver->getChanges();

        return response()->json($changes);
    }
}
