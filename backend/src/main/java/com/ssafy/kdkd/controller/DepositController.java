package com.ssafy.kdkd.controller;

import static com.ssafy.kdkd.domain.dto.Deposit.DepositDto.mappingDepositDto;

import com.ssafy.kdkd.domain.dto.Deposit.DepositDto;
import com.ssafy.kdkd.domain.entity.deposit.Deposit;
import com.ssafy.kdkd.service.Deposit.DepositService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/deposit")
public class DepositController {

    private final DepositService depositService;

    @GetMapping("/history/{childId}")
    public ResponseEntity<?> list(@PathVariable("childId") Long childId, HttpServletRequest request) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = HttpStatus.OK;
        try {
            log.info("saving controller: info() Enter");
            // 현재 childId에 대한 권한 확인
            boolean isValid = false;

            if (isValid) {
                status = HttpStatus.UNAUTHORIZED;
            } else {
                // childId가 가진 deposit 테이블 확인
                List<Deposit> deposits = depositService.findDepositByChildId(childId);
                if (deposits.isEmpty()) {
                    status = HttpStatus.NO_CONTENT;
                } else {
                    List<DepositDto> depositDtoList = mappingDepositDto(deposits);
                    resultMap.put("DepositList", depositDtoList);
                }
            }
        } catch (Exception e) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

}
