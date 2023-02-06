package com.ezpz.shabit.admin.service.youtube;

import com.ezpz.shabit.admin.dto.YouTubeDto;
import com.google.api.client.googleapis.json.GoogleJsonResponseException;
import com.google.api.client.http.HttpRequest;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.Thumbnail;
import com.google.api.services.youtube.model.Video;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class YouTubeServiceImpl implements YouTubeService {

    private static final HttpTransport HTTP_TRANSPORT = new NetHttpTransport();
    private static final JsonFactory JSON_FACTORY = new JacksonFactory();
    private static final long NUMBER_OF_VIDEOS_RETURNED = 1;

    private static YouTubeDto getInfo(Iterator<Video> iteratorSearchResults) {
        YouTubeDto youTubeDto = null;

        if (!iteratorSearchResults.hasNext()) {
            log.error(" There aren't any results for your query.");
        }

        while (iteratorSearchResults.hasNext()) {

            Video singleVideo = iteratorSearchResults.next();

            // Double checks the kind is video.
            if (singleVideo.getKind().equals("youtube#video")) {
                Thumbnail thumbnail = (Thumbnail) singleVideo.getSnippet().getThumbnails().get("high");
                String length = singleVideo.getContentDetails().getDuration();
//                System.out.println(length);
                String minute = "00";
                String second = "00";

                Pattern minutePattern = Pattern.compile("(?<=PT).*(?=M)");
                Matcher matcher = minutePattern.matcher(length);
                if(matcher.find()) {
                    minute = matcher.group();
//                    System.out.println("Match " + minute);
                }
                Pattern secondPattern = Pattern.compile("(?<=M).*(?=S)");
                matcher = secondPattern.matcher(length);
                if(matcher.find()) {
                    second = matcher.group();
//                    System.out.println("Match " + second);
                }

                int lengthInteger = Integer.parseInt(minute);

                youTubeDto = YouTubeDto.builder()
                        .videoId(singleVideo.getId())
                        .title(singleVideo.getSnippet().getTitle())
                        .thumbnail(thumbnail.getUrl())
                        .originalLength(minute + ":" + second)
                        .length(lengthInteger)
                        .build();

                log.info(youTubeDto.toString());
            }
        }
        return youTubeDto;
    }

    @Value("${key.youtube}")
    String key;

    @Override
    public YouTubeDto get(String url) {
        YouTubeDto youTubeDto = null;

        String videoId = parsingUrl(url);

        try {
            YouTube youtube = new YouTube.Builder(HTTP_TRANSPORT, JSON_FACTORY, new HttpRequestInitializer() {
                public void initialize(HttpRequest request) throws IOException {
                }
            }).setApplicationName("youtube-video-duration-get").build();

            YouTube.Videos.List videos = youtube.videos().list("id,snippet,contentDetails");
            videos.setKey(key);
            videos.setId(videoId);
            videos.setMaxResults(NUMBER_OF_VIDEOS_RETURNED); //조회 최대 갯수.
            List<Video> videoList = videos.execute().getItems();

            if (videoList != null) {
                youTubeDto = getInfo(videoList.iterator());
            }
        } catch (GoogleJsonResponseException e) {
            log.error("There was a service error: " + e.getDetails().getCode() + " : "
                    + e.getDetails().getMessage());
        } catch (IOException e) {
            log.error("There was an IO error: " + e.getCause() + " : " + e.getMessage());
        } catch (Throwable t) {
            t.printStackTrace();
        }

        return youTubeDto;
    }


    private String parsingUrl(String url) {
        Pattern pattern = Pattern.compile("(?<=watch\\?v=).*(?=[&]?)");
        Matcher matcher = pattern.matcher(url);
        if(matcher.find()) {
            log.info("Match " + matcher.group());
        }

        return matcher.group();
    }

}