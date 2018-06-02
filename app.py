# import necessary libraries
import numpy as np

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
   
#################################################
# Database Setup
#################################################
import pandas as pd
import sqlite3

conn = sqlite3.connect("data/flp2data.sqlite")

# Create Dataframes for median income and median homeprice
# income_df = pd.read_sql_query("select * from income;", conn)

# home_df = pd.read_sql_query("select * from homeprice;", conn)

all_df = pd.read_sql_query("select * from projectdata;", conn)

# sampMeta_df = pd.read_sql_query("select * from samples_metadata", conn)





#################################################
# Create routes
#################################################
# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/data")
def data():
    
    
    result_set = []
    state_set = []
    for index in range(len(all_df["id"])):
        stateList = []
        abbrList = []
        lat_data = []
        lon_data = []
        mhi_data = []
        mhp_data = []
        vcr_data = []
        hw_data = []
        stateList.append(str(all_df.iloc[index]['state']))
        abbrList.append(str(all_df.iloc[index]['abbr']))
        lat_data.append(str(all_df.iloc[index]['lat']))
        lon_data.append(str(all_df.iloc[index]['long']))
        
#         #load the MHI data
        for x in range(21,29):
            mhi_data.append(int(all_df.iloc[index,x]))
#             print(mhi_data)
#         #load the MHp data at offset 14-21
        for y in range(13,21):   
            mhp_data.append(int(all_df.iloc[index,y]))
#             print(mhp_data)
        for z in range(29,37):
            vcr_data.append(int(all_df.iloc[index,z]))
#             print(vcr_data)
#         #load the data for wells at this 3-11 location
        for xx in range(3,11):
            hw_data.append(int(all_df.iloc[index,xx]))
#             print(hw_data)
            
            
        state_set = {
            'state': stateList,
            'abbr': abbrList,
            'lat': str(lat_data),
            'lon': str(lon_data),
            'mhi_data': str(mhi_data),
            'mhp_data': str(mhp_data),
            'vcr_data': str(vcr_data),
            'hw_data': str(hw_data)
        }
        result_set.append(state_set)

    return jsonify(result_set)


if __name__ == "__main__":
    app.run(debug=True)
