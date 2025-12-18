import pkgutil
import importlib
import google.adk

def find_query_class(package):
    if hasattr(package, "__path__"):
        for _, name, is_pkg in pkgutil.walk_packages(package.__path__, package.__name__ + "."):
            try:
                module = importlib.import_module(name)
                for attr_name in dir(module):
                    if "Query" in attr_name and "class" in str(type(getattr(module, attr_name))):
                         print(f"Found {attr_name} in {name}")
            except Exception:
                pass

find_query_class(google.adk)
