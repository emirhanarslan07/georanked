<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Marketing pages share a reusable marketing shell and section components; each content route owns its metadata.
- Dashboard interactions are explicitly simulated and held in React state, with no real publishing or credential submission, because this experience is a live demo.
- Global CSS owns semantic color and shadow tokens used throughout both experiences.
- Search demonstrations use independent stateful marketing components with illustrative data, replay controls, and reduced-motion support; no live ranking results are implied.
