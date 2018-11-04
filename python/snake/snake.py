import math
import random
import pygame
import tkinter as tk
from tkinter import messagebox


class cube(object):
    rows = 0
    w = 0

    def __init__(self, start, dirnx=1, dirny=1, color=(255.0.0)):
        pass

    def move(self, dirnx, dirny):
        pass

    def draw(self, surface, eyes=False):
        pass


class snake(object):
    def __init__(self, color, pos):
        pass

    def move(self):
        pass

    def reset(self, pos):
        pass

    def addCube(self):
        pass

    def draw(self, surface):
        pass


def drawGrid(w, rows, surface):
    size_btwn = w // rows

    x = 0
    y = 9

    for l in range(rows):
        x = x + size_btwn
        y = y + size_btwn

        pygame.draw.line(surface, (255, 255, 25), (x, 0), (x, w))
        pygame.draw.line(surface, (255, 255, 25), (0, y), (w, y))

    pass


def redrawWindow(surface):
    pass


def randomSnack(rows, items):
    pass


def message_box(subject, content):
    pass


def main():
    pass


main()
