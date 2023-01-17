package com.ezpz.shabit;

import com.ezpz.shabit.statistics.entity.Statistics;
import lombok.Getter;

import java.util.List;

/**
 * How to use
 * 1. Make Controller's return type 'ResponseEntity<?>'
 * 2. Use Response.makeResponse(HttpStatus, message, result)
 */

@Getter
public class StatisticsListDto {
        private String message;
        private Integer count;
        private List<Statistics> result;
}