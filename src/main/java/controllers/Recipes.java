package controllers;

import org.glassfish.jersey.media.multipart.FormDataParam;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import server.Main;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

@Path("recipe/")

public class Recipes {
    @GET
    @Path("list")
    @Produces(MediaType.APPLICATION_JSON)
    public String RecipeList() {
        System.out.println("Invoked Recipes.RecipeList()");
        JSONArray recipe = new JSONArray();
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT RecipeID, Name FROM Recipes");
            ResultSet results = ps.executeQuery();
            while (results.next()) {
                JSONObject row = new JSONObject();
                row.put("RecipeID", results.getInt(1));
                row.put("RecipeName", results.getString(2));
                recipe.add(row);
            }
            JSONObject response = new JSONObject();
            response.put("recipes", recipe);
            return response.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"Error\": \"Unable to list items.  Error code xx.\"}";
        }
    }

    @GET
    @Path("get/{RecipeID}")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MediaType.APPLICATION_JSON)

    public String GetRecipe(@PathParam("RecipeID") Integer RecipeID) {
        System.out.println("Invoked Recipes.GetRecipe() with RecipeID " + RecipeID);
        try {
            PreparedStatement ps = Main.db.prepareStatement("SELECT Name FROM Recipes WHERE RecipeID = ?");
            ps.setInt(1, RecipeID);
            ResultSet results = ps.executeQuery();
            JSONObject response = new JSONObject();
            if (results.next()== true) {
                response.put("RecipeID", RecipeID);
                response.put("Name", results.getString(1));
            }
            return response.toString();
        } catch (Exception exception) {
            System.out.println("Database error: " + exception.getMessage());
            return "{\"Error\": \"Unable to get item, please see server console for more info.\"}";
        }
    }
}
