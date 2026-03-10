from fastapi import WebSocket
from typing import List, Dict
import json
import asyncio

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, List[WebSocket]] = {}

    async def connect(self, job_id: str, websocket: WebSocket):
        await websocket.accept()
        if job_id not in self.active_connections:
            self.active_connections[job_id] = []
        self.active_connections[job_id].append(websocket)

    def disconnect(self, job_id: str, websocket: WebSocket):
        if job_id in self.active_connections:
            self.active_connections[job_id].remove(websocket)

    async def send_log(self, job_id: str, message: str, level: str = "info"):
        log_entry = {
            "message": message,
            "level": level,
            "timestamp": asyncio.get_event_loop().time() # Placeholder for real timestamp
        }
        if job_id in self.active_connections:
            for connection in self.active_connections[job_id]:
                await connection.send_text(json.dumps(log_entry))

manager = ConnectionManager()
