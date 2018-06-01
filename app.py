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

#Create Dataframes for median income and median homeprice
income_df = pd.read_sql_query("select * from income;", conn)

home_df = pd.read_sql_query("select * from homeprice;", conn)

# sampMeta_df = pd.read_sql_query("select * from samples_metadata", conn)





#################################################
# Create routes
#################################################
# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/income")
def income():
    
    
    result_set = []
    state_set = []
    for index in range(len(income_df["id"])):
        stateList = []
        abbrList = []
        mhi_data = []
        stateList.append(income_df.iloc[index]['state'])
        abbrList.append(income_df.iloc[index]['abbr'])
        for x in range(3,11):
            mhi_data.append(int(income_df.iloc[index,x]))
        state_set = {
            'state': stateList,
            'abbr': abbrList,
            'data': str(mhi_data)
        }
        result_set.append(state_set)

    return jsonify(result_set)

@app.route("/house")
def house():
    
    result_set = []
    state_set = []
    for index in range(len(home_df["id"])):
        stateList = []
        abbrList = []
        mhp_data = []
        stateList.append(home_df.iloc[index]['state'])
        abbrList.append(home_df.iloc[index]['abbr'])
        for x in range(3,11):
            mhp_data.append(int(home_df.iloc[index,x]))
        state_set = {
            'state': stateList,
            'abbr': abbrList,
            'data': str(mhp_data)
        }
        result_set.append(state_set)

    return jsonify(result_set)

# @app.route("/scatter/<sample>")
# def scatter(sample):
#     # results = db.session.query(Pet.type, func.count(Pet.type)).group_by(Pet.type).all()
#     print(sample)
    
#     # sample = "BB_940" 
#     data = sample.split("_")
#     idBB = data[1] 
#     print(sampMeta_df.loc[sampMeta_df['SAMPLEID'] == int(idBB)])  
#     idResult_df = sampMeta_df.loc[sampMeta_df['SAMPLEID'] == int(idBB)]
#     results = [{
#         'AGE': int(idResult_df.iloc[0]['AGE']),
#         "BBTYPE": idResult_df.iloc[0]['BBTYPE'],
#         "ETHNICITY": idResult_df.iloc[0]['ETHNICITY'],
#         "GENDER": idResult_df.iloc[0]['GENDER'],
#         "LOCATION": idResult_df.iloc[0]['LOCATION'],
#         "SAMPLEID": int(idResult_df.iloc[0]['SAMPLEID'])
#     }]

#         sampleResults = [{
#             'otu_ids': otuList,
#             'sample_values': sampleList
#         }] 


#     return jsonify(sampleResults)

# @app.route("/wfreq/<sample>")
# def wfreq(sample):
#     # results = db.session.query(Pet.type, func.count(Pet.type)).group_by(Pet.type).all()
#     print(sample)
#     # results = [24]
    
    
#     data = sample.split("_")
#     wfreqID = data[1] 
    
#     print(wfreqID)
#     print(sampMeta_df.loc[sampMeta_df['SAMPLEID'] == int(wfreqID)]) 

#     wfreqResult_df = sampMeta_df.loc[sampMeta_df['SAMPLEID'] == int(wfreqID)]
    
#     print(wfreqResult_df)

#     wfreqNbr = wfreqResult_df.iloc[0]['WFREQ']
    
#     return jsonify(wfreqNbr)

@app.route('/scatter/<sample>')
def scatter(sample):
    # results = db.session.query(Pet.type, func.count(Pet.type)).group_by(Pet.type).all()
    print(sample)
    
    nbr_wells = [12,34,56,32,56,77,33,11,33,55,76,9]
    mhp_yr = [100,200,102,300,400,300,200,145,176,123,199,250]
    abbrList = ["al", "ak", "az", "il", 'wi', "ca", "mn", "ma", 'tx', "ia", "nh", 'sc'] 
    # sampleList =[]
    # otuList =[]
    # abbrList =[]
    # for index in range(len(descSamples_df["otu_id"])):
    #     if (descSamples_df.iloc[index,position] != 0):
    #         sampleList.append(int(descSamples_df.iloc[index,position]))
    #         otuList.append(int(descSamples_df.iloc[index,0]))
        
    sampleResults = [{
            'nbr_wells': nbr_wells,
            'abbr': abbrList,
            'sample_values': mhp_yr
        }] 


    return jsonify(sampleResults)


if __name__ == "__main__":
    app.run(debug=True)

