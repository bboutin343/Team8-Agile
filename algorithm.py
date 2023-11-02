import statistics
import json
from collections import Counter

def likedsongs():
    #grabs a list of the liked songs
    return liked

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

def createplaylist(daterange, genres, size=20):
    #find songs from the spotify database that have a releasedate in the
    #given range and matching genre, then create a playlist of a similar
    #composition of genre to the user's liked songs and indicated size.
    return playlist

liked = likedsongs()
likedinfo = extractinfo(liked)
date = []
genre = []
for i in likedinfo:
    date.append(i[1])
    genre.append(i[2])
daterange = dates(date)
genrecomp = genres(genre)
playlist = createplaylist(daterange, genrecomp, 20)