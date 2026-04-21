"""
models.py — Pydantic data models for the floor plan pipeline.
"""

from __future__ import annotations
from typing import List, Optional
from pydantic import BaseModel, Field


class Wall(BaseModel):
    id:        str   = ""
    start:     List[float] = Field(..., min_length=2, max_length=2)
    end:       List[float] = Field(..., min_length=2, max_length=2)
    thickness: float = 10.0
    # If an OCR dimension was matched to this wall, these are set:
    label_m:   Optional[float] = None   # matched dimension in metres
    label_text: Optional[str]  = None   # raw OCR text e.g. "4m"


class Room(BaseModel):
    id:      str = ""
    polygon: List[List[float]]


class FloorPlan(BaseModel):
    walls:        List[Wall] = []
    rooms:        List[Room] = []
    scale:        float      = 1.0    # pixels per metre
    image_width:  int        = 0
    image_height: int        = 0
    # OCR summary shown in UI
    ocr_found:    int        = 0      # how many dimension annotations were read
    ocr_matched:  int        = 0      # how many were successfully matched to walls


class AnalyzeResponse(BaseModel):
    floor_plan:  FloorPlan
    debug_image: Optional[str] = None  # base64 PNG of annotated detection
