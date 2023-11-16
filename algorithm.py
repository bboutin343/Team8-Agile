import statistics
import json
import requests
import random
from collections import Counter

def likedsongs(access_token):
    endpoint = 'https://api.spotify.com/v1/me/tracks'
    headers = {'Authorization': f'Bearer {access_token}'}
    response = requests.get(endpoint, headers=headers)
    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        return response.json()['items']
    else:
        print(f"Error: {response.status_code}")
        return None

def extractinfo(songs):
    #extracts the songs and metadata
    data = []
    for i in songs:
        data.append([json.loads(i)['name']],[json.loads(i)['album']['release_date']],[json.loads(i)['artists']['genres']])
    return data

def dates(releasedates):
    avg = statistics.mean(releasedates)
    res = statistics.pstdev(releasedates)
    min = avg - (res * 3)
    max = avg + (res * 3)
    range = [min, max]
    return range

def genres(genrelist):
    uniques = Counter(genrelist).keys()
    counts = Counter(genrelist).values()
    percents = []
    for i in counts:
        percents.append(i/len(genrelist))
    merged_list = tuple(zip(uniques, percents))
    return merged_list

def createplaylist(daterange, genres, size=20, access_token=None):
    endpoint = 'https://api.spotify.com/v1/search'
    headers = {'Authorization': f'Bearer {access_token}'}
    playlist = []
    while len(playlist) < size:
        selected_genre, genre_weight = random.choice(genres)
        release_year = random.randint(daterange[0], daterange[1])
        params = {
            'q': f'genre:"{selected_genre}" year:{release_year}',
            'type': 'track',
            'limit': size
        }
        response = requests.get(endpoint, headers=headers, params=params)
        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            # Extract and append the first track from the search results
            track_data = response.json().get('tracks', {}).get('items', [])
            if track_data:
                playlist.append(track_data[0])
        else:
            print(f"Error: {response.status_code}")
    return playlist

access_token = "placeholder"
liked = likedsongs(access_token)
likedinfo = extractinfo(liked)
date = []
genre = []
for i in likedinfo:
    date.append(i[1])
    genre.append(i[2])
daterange = dates(date)
genrecomp = genres(genre)
playlist = createplaylist(daterange, genrecomp, 20, access_token)