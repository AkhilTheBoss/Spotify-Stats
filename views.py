from flask import Blueprint, render_template, request, jsonify
import os
import json
import spotipy
import requests


os.environ['SPOTIPY_CLIENT_ID'] = "cc22de52a6e6408bbe5ba1a491f1d1cf"
os.environ['SPOTIPY_CLIENT_SECRET'] = "e4b858fd5b97468f9d2acd90bef8b5fb"
os.environ['SPOTIPY_REDIRECT_URI'] = 'http://localhost:8888/callback'

spotify_client_id = os.environ['SPOTIPY_CLIENT_ID']
spotify_secret = os.environ['SPOTIPY_CLIENT_SECRET']
spotify_redirect_uri = os.environ['SPOTIPY_REDIRECT_URI']

# scope = 'user-top-read'

MyPages = Blueprint(__name__, "views")
@MyPages.route("/")
def home():
    return render_template("mainPage.html")


@MyPages.route("/result", methods = ['POST', 'GET'])
def Result():
    pass

@MyPages.route("/artists", methods = ['POST', 'GET'])
def Artists():
    return render_template("artists.html")

@MyPages.route("/songs", methods = ['POST', 'GET'])
def Songs():
    return render_template("songs.html")


@MyPages.route("/getList", methods = ['POST', 'GET'])
def getList():
    scope = 'user-top-read'
    List = []
    if request.method == 'POST':
        print("hbbj")
        data = request.get_json(force=True)
        print(data['Explain'])
        oauth_object = spotipy.SpotifyOAuth(client_id = spotify_client_id,
                                    client_secret = spotify_secret,
                                    redirect_uri = spotify_redirect_uri,
                                    scope = scope)



        token_dict = oauth_object.get_access_token()

        token = token_dict['access_token']
        spotify_object = spotipy.Spotify(auth=token)
        if data['Explain'] == "Top 4-Week":
            current = spotify_object.current_user_top_tracks(limit=50, time_range="short_term")
            print("SHORT")
        elif data['Explain'] == "Top 6-Month":
            current = spotify_object.current_user_top_tracks(limit=50, time_range="medium_term")
            print("MEDIUM")
        elif data["Explain"] == "Top All-Time":
            current = spotify_object.current_user_top_tracks(limit=50, time_range="long_term")
            print("LONG")

        with open('top50_data.json', 'w', encoding='utf-8') as f:
            json.dump(current, f, ensure_ascii=False, indent=4)

        f = open ('top50_data.json', "r")
        # Reading from file
        data = json.loads(f.read())
        for i in range(len(data['items'])):
            List.append({"Name": data['items'][i]['name'], "Url": data['items'][i]['album']['images'][2]['url']})

        # print(data['items'][0]['album']['images'][2]['url'])

        List = json.dumps(List)
        print("JCN")
    return List


@MyPages.route("/getArtists", methods = ['POST', 'GET'])
def getArtist():
    scope = 'user-top-read'
    List = []
    if request.method == 'POST':
        print("hbbjss")
        data = request.get_json(force=True)
        print(data['Explain'])
        oauth_object = spotipy.SpotifyOAuth(client_id = spotify_client_id,
                                    client_secret = spotify_secret,
                                    redirect_uri = spotify_redirect_uri,
                                    scope = scope)



        token_dict = oauth_object.get_access_token()

        token = token_dict['access_token']
        spotify_object = spotipy.Spotify(auth=token)
        if data['Explain'] == "Top 4-Week":
            current = spotify_object.current_user_top_artists(limit=50, time_range="short_term")
            print("SHORT")
        elif data['Explain'] == "Top 6-Month":
            current = spotify_object.current_user_top_artists(limit=50, time_range="medium_term")
            print("MEDIUM")
        elif data["Explain"] == "Top All-Time":
            current = spotify_object.current_user_top_artists(limit=50, time_range="long_term")
            print("LONG")

        with open('top50_data.json', 'w', encoding='utf-8') as f:
            json.dump(current, f, ensure_ascii=False, indent=4)

        f = open ('top50_data.json', "r")
        # Reading from file
        data = json.loads(f.read())
        for i in range(len(data['items'])):
            List.append({"Name": data['items'][i]['name'], "Url": data['items'][i]['images'][2]['url']})

        # print(data['items'][0]['album']['images'][2]['url'])

        List = json.dumps(List)
        print("JCN")
    return List



@MyPages.route("/current", methods = ['POST', 'GET'])
def getCurrent():

    return render_template("currentSongs.html")


@MyPages.route("/recent", methods = ['POST', 'GET'])
def getRecent():
    List = []
    scope = 'user-read-recently-played'
    oauth_object = spotipy.SpotifyOAuth(client_id = spotify_client_id,
                                client_secret = spotify_secret,
                                redirect_uri = spotify_redirect_uri,
                                scope = scope)



    token_dict = oauth_object.get_access_token()

    token = token_dict['access_token']
    spotify_object = spotipy.Spotify(auth=token)
    current = spotify_object.current_user_recently_played(limit=50)

    with open('top50_data.json', 'w', encoding='utf-8') as f:
        json.dump(current, f, ensure_ascii=False, indent=4)

    f = open ('top50_data.json', "r")
    # Reading from file
    data = json.loads(f.read())
    for i in range(len(data['items'])):
        List.append({"Name": data['items'][i]['track']['album']['name'], "artist": data['items'][i]['track']['artists'][0]['name']})
        # List.append(data['items'][i]['track']['album']['name'])
    # print(data['items'][0]['album']['images'][2]['url'])

    List = json.dumps(List)
    return List
