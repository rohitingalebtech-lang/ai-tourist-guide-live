import sqlite3
import os

DATABASE_FOLDER = os.path.dirname(os.path.abspath(__file__))
DATABASE_PATH = os.path.join(DATABASE_FOLDER, "trip_history.db")


def get_connection():
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def create_table():
    with get_connection() as connection:
        connection.execute("""
            CREATE TABLE IF NOT EXISTS trips (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                starting_city TEXT NOT NULL,
                destination TEXT NOT NULL,
                travellers INTEGER NOT NULL,
                days INTEGER NOT NULL,
                transport TEXT NOT NULL,
                total_cost REAL NOT NULL,
                cost_per_person REAL NOT NULL,
                budget_limit REAL NOT NULL,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        """)


def save_trip(starting_city, destination, travellers, days,
              transport, total_cost, cost_per_person, budget_limit):

    with get_connection() as connection:
        connection.execute("""
            INSERT INTO trips (
                starting_city,
                destination,
                travellers,
                days,
                transport,
                total_cost,
                cost_per_person,
                budget_limit
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            starting_city,
            destination,
            travellers,
            days,
            transport,
            total_cost,
            cost_per_person,
            budget_limit
        ))


def get_all_trips():
    with get_connection() as connection:
        return connection.execute("""
            SELECT * FROM trips
            ORDER BY id DESC
        """).fetchall()


def get_trip(trip_id):
    with get_connection() as connection:
        return connection.execute("""
            SELECT * FROM trips
            WHERE id = ?
        """, (trip_id,)).fetchone()


def delete_trip(trip_id):
    with get_connection() as connection:
        connection.execute("""
            DELETE FROM trips WHERE id = ?
        """, (trip_id,))