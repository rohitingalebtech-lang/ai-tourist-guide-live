import math
from flask import Flask, render_template, redirect, url_for, request, jsonify
from database.trip_history import (
    create_table,
    save_trip,
    get_all_trips,
    get_trip,
    delete_trip
)

app = Flask(__name__)

# Create the database table
create_table()


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/budget")
def budget():
    return render_template("budget.html")
@app.route("/save-trip", methods=["POST"])
def save_trip_route():
    data = request.get_json(silent=True)

    if not data:
        return jsonify({"error": "No trip data received."}), 400

    try:
        starting_city = str(data.get("start", "")).strip()
        destination = str(data.get("destination", "")).strip()
        travellers = int(data.get("travellers", 0))
        days = int(data.get("days", 0))
        transport = str(data.get("transport", "")).strip()
        total_cost = float(data.get("total", -1))
        cost_per_person = float(data.get("perPerson", -1))
        budget_limit = float(data.get("budgetLimit", -1))

        if not starting_city or not destination or not transport:
            raise ValueError("Please provide the starting city, destination, and transport.")

        if not (1 <= travellers <= 100 and 1 <= days <= 365):
            raise ValueError("Invalid number of travellers or days.")

        if not all(
            math.isfinite(value) and value >= 0
            for value in (total_cost, cost_per_person, budget_limit)
        ):
            raise ValueError("Invalid cost values.")

        save_trip(
            starting_city,
            destination,
            travellers,
            days,
            transport,
            total_cost,
            cost_per_person,
            budget_limit
        )

        return jsonify({"message": "Trip saved successfully."}), 201

    except (ValueError, TypeError, OverflowError) as error:
        return jsonify({"error": str(error) or "Invalid trip information."}), 400

@app.route("/trip-history")
def trip_history():
    trips = get_all_trips()
    return render_template("trip_history.html", trips=trips)


@app.route("/trip-history/<int:trip_id>")
def trip_history_detail(trip_id):
    trip = get_trip(trip_id)

    if trip is None:
        return "Trip not found", 404

    return render_template("trip_detail.html", trip=trip)


@app.route("/trip-history/delete/<int:trip_id>", methods=["POST"])
def delete_trip_route(trip_id):
    delete_trip(trip_id)
    return redirect(url_for("trip_history"))


if __name__ == "__main__":
    app.run(debug=True)