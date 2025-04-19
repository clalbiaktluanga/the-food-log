
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChefHat, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="text-center p-6 max-w-md">
        <ChefHat className="h-20 w-20 mx-auto text-spice-500 mb-6" />
        <h1 className="font-serif text-4xl font-bold mb-4">Recipe Not Found</h1>
        <p className="text-muted-foreground mb-6">
          Oops! Looks like we couldn't find the recipe you were looking for. It might have been moved or deleted.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/">
            <Button className="bg-spice-500 hover:bg-spice-600 flex items-center gap-2">
              <Home className="h-4 w-4" />
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
