# Organización repositorio
Para cada táctica aplicada, se encuentra creada una rama distinta con los respectivos comandos a correr

## Start application
```docker-compose up -d```

## Test running application
```curl localhost:5555/api/ping```

### Meta
```curl localhost:5555/api/metar\?station=SAEZ```

### Spaceflight News
```curl localhost:5555/api/spaceflight_news```

### Random Quote
```curl localhost:5555/api/quote```

## Performance Testing
```chmod +x perf/run-scenario.sh```

### Load Testing Example
```cd perf && ./run-scenario.sh loadTesting/ping api```
