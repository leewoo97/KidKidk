package com.ssafy.kdkd.notification.controller;

import com.ssafy.kdkd.notification.dto.NotificationMessageDto;
import com.ssafy.kdkd.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

@CrossOrigin("*")
@RestController
@Slf4j
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;
    public static final Long DEFAULT_TIMEOUT = 3600L * 1000;

    @GetMapping(value = "/kafka/subscribe/{userId}", produces = "text/event-stream")
    public SseEmitter subscribe(@PathVariable String userId, @RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId) throws IOException {
        System.out.println(lastEventId);
        return notificationService.subscribe(userId, lastEventId);
    }

    @PostMapping(value = "/kafka/publish")
    public ResponseEntity<?> publish(@RequestBody NotificationMessageDto msg){
        notificationService.publish(msg.getSubId(), msg.getPubName(), msg.getMessage(), msg.getSub_message());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}