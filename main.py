#  create a class addition using data overloading with method that will add and return 3 values if given anotherwise it will add and return 2 values if given another wise it will return the  1st value
class Addition:
    def __init__(self, a,b,c):
        self.a = a
        self.b = b
        self.c = c

    def __add__(self, other):
        if isinstance(other, Addition):
            return Addition(self.value1 + other.value1)
        elif isinstance(other, int):
            return Addition(self.value1 + other)
        else:
            return self

    def __str__(self):
        return str(self.value1)
