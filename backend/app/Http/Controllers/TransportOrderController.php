<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use App\Models\TransportOrder;

class TransportOrderController extends Controller
{
    public function getAll()
    {
        $orders = DB::table('transport_orders')->get();

        return $orders;
    }

    public function getById(int $id)
    {
        $order = DB::table('transport_orders')->where('id', $id)->firstOrFail();

        return $order;

    }
    public function create(Request $request): JsonResponse
    {
        $rawBody = $request->getContent();
        $data = json_decode($rawBody, true);
        $order = TransportOrder::create($data);

        return response()->json($order);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $rawBody = $request->getContent();
        $data = json_decode($rawBody, true);

        $order = TransportOrder::find($id);
        $order->update($data);
        $changes = $order->getChanges();

        return response()->json($changes);
    }
}
