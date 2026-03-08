<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use App\Models\TransportOrder;

class TransportOrderController extends Controller
{
    public function getAll(Request $request): JsonResponse
    {
        $query = TransportOrder::query();

        $query->when($request->query('status'), function ($query, $status) {
            return $query->where('status', $status);
        });

        $query->when($request->query('driver_id'), function ($query, $driver_id) {
            return $query->where('driver_id', $driver_id);
        });

        $query->when($request->query('limit'), function ($query, $limit) {
            return $query->limit($limit);
        });

        return response()->json($query->get());
    }

    public function getById(int $id)
    {
        $order = TransportOrder::find($id);

        return $order;

    }

    public function getAmountOrders(Request $request): JsonResponse
    {
        $query = TransportOrder::query();

        $query->when($request->query('status'), function ($query, $status) {
            return $query->where('status', $status);
        });

        return response()->json([
            "quantidade" => $query->count(),
        ]);
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

    public function advanceOrder(int $id): JsonResponse
    {
        $order = TransportOrder::find($id);
        $newStatus = '';

        switch ($order->status) {
            case 'pending':
                $newStatus = 'collecting';
                break;
            case 'collecting':
                $newStatus = 'collected';
                break;
            case 'collected':
                $newStatus = 'delivering';
                break;
            case 'delivering':
                $newStatus = 'delivered';
                break;
            case 'delivered':
                return response()->json(["mensagem" => "Esta ordem de transporte já foi entregue."], 400);
            default:
                return response()->json(["mensagem" => "Esta ordem possui um status inválido."], 500);
        }
        $order->update([
            'status' => $newStatus,
        ]);
        $changes = $order->getChanges();

        return response()->json($changes);
    }

    public function deleteOrder(int $id): JsonResponse
    {
        $order = TransportOrder::find($id);
        if ($order->status != 'pending') {
            return response()->json(["mensagem" => "Esta ordem não está pendente."], 400);
        }
        $deleted = $order->delete();

        return response()->json($deleted);
    }
}
