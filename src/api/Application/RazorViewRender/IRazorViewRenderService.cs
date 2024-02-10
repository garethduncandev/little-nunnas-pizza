namespace Application.RazorViewRender;

public interface IRazorViewRenderService
{
    Task<string> RenderViewToStringAsync<TModel>(string razorViewPath, TModel model);
}