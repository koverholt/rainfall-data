from . import RainfallData

def test_RainfallData():
    assert RainfallData.apply("Jane") == "hello Jane"
