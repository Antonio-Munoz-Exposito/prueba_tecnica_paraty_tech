from flask import Flask, jsonify, request
from rooms_info import room_list
from flask_cors import CORS

app = Flask(__name__)

CORS(app)


def extract_occupancy(prices):
    for price in prices:
        if 'target_occupancy' in price:
            return price['target_occupancy']
        

@app.route("/rooms")
def roomsList():
    return jsonify(room_list)

@app.route("/room/<int:id>")
def roomDetails(id):
    for room in room_list:
        if room["room_key"] == id:
            return jsonify(room)

    return jsonify({"error": "not found"})

@app.route("/search")
def search():
    adults = request.args.get('adults')
    children = request.args.get('children')
    babies = request.args.get('babies')
    maxprice = request.args.get('maxprice')
    occupancy = f'{adults}-{children}-{babies}'

    rooms = []

    search_list = room_list.copy()
    
    for roomIt in search_list:
        room = roomIt.copy()
        if(occupancy not in room['available_occupancy']):
            continue

        # Nos quedamos solo con los precios para esta ocupacion
        dt_prices = []
        for prices in room['data_prices']:
            cur_ocuppancy = extract_occupancy(prices)
            if occupancy in cur_ocuppancy:
                dt_prices.append(prices)
        room['data_prices'] = dt_prices.copy()



        # Si hay precio maximo, filtramos
        if maxprice:
            maxprice = float(maxprice)
            dt_prices = []
            for prices_list in room['data_prices']:
                test_prices = []
                for price in prices_list:
                    if price['price'] <= maxprice:
                        test_prices.append(price)
                if len(test_prices) > 0:
                    dt_prices.append(test_prices)
            if len(dt_prices) < 1:
                continue
            room['data_prices'] = dt_prices.copy()


        rooms.append(room)

    return jsonify(rooms)



if __name__ == "__main__":
    app.run(debug=True)

